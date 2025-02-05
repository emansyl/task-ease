import { NextResponse } from "next/server";
import { z } from "zod";
import { todoListCreateSchema } from "@/lib/validations/todo";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (!data?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = todoListCreateSchema.parse(json);

    const todoList = await prisma.todoList.create({
      data: {
        ...body,
        userId: data.user.id,
      },
    });

    return NextResponse.json(todoList);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse(null, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (!data?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const todoLists = await prisma.todoList.findMany({
      where: {
        userId: data.user.id,
        isArchived: false,
      },
      include: {
        _count: {
          select: { todos: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(todoLists);
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
