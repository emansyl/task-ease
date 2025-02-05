import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const { data } = await supabase.auth.getUser();

    if (!data?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    console.log(json);
    // const validatedData = todoCreateSchema.parse(json);
    // console.log("hello", validatedData);

    const todo = await prisma.todo.create({
      data: {
        ...json,
        userId: data.user.id,
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 400 });
    }
    console.error("[TODOS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    const { data } = await supabase.auth.getUser();

    if (!data?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const listId = searchParams.get("listId");

    const todos = await prisma.todo.findMany({
      where: {
        userId: data.user.id,
        listId: listId || null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(todos);
  } catch (error) {
    console.error("[TODOS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
