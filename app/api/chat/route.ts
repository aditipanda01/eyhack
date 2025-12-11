import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Mock customer data
const mockCustomers: any = {
  'CUST001': {
    name: 'Rajesh Kumar',
    monthlyIncome: 75000,
    creditScore: 750
  }
};

// Tool handler function
async function handleToolCall(toolName: string, toolInput: any) {
  if (toolName === "get_customer_info") {
    const customer = mockCustomers[toolInput.customer_id];
    if (!customer) {
      return { error: "Customer not found" };
    }
    return customer;
  }
  return { error: "Unknown tool" };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, sessionId } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const tools = [
      {
        name: 'get_customer_info',
        description: 'Get customer information using customer ID',
        input_schema: {
          type: 'object',
          properties: {
            customer_id: { type: 'string' }
          },
          required: ['customer_id']
        }
      }
    ];

    // First request to Claude
    const response = await anthropic.messages.create({
      model: "claude-3.5-sonnet-latest",
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      tools: tools
    });

    const firstBlock = response.content[0];

    // 🟦 1) If Claude provides a tool call
    if (firstBlock.type === "tool_use") {
      const toolResult = await handleToolCall(firstBlock.name, firstBlock.input);

      // Send result of tool back to Claude
      const secondResponse = await anthropic.messages.create({
        model: "claude-3.5-sonnet-latest",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: message
          },
          {
            role: "assistant",
            content: firstBlock
          },
          {
            role: "tool",
            content: toolResult
          }
        ]
      });

      const textReply = secondResponse.content.find((c: any) => c.type === "text")?.text;
      return NextResponse.json({ reply: textReply || "Here is the customer info." });
    }

    // 🟩 2) If Claude just replies normally
    const textContent = response.content.find((block: any) => block.type === 'text');
    const reply = textContent?.text || "Hello! How can I help you?";

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error('[API] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
