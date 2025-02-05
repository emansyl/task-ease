import { NextResponse } from "next/server";
import { z } from "zod";
import { todoCreateSchema, todoUpdateSchema } from "@/lib/validations/todo";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = todoCreateSchema.parse(json);

    const todo = await prisma.todo.create({
      data: {
        ...body,
        userId: user.id,
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse(null, { status: 500 });
  }
}

export async function GET(req: Request, props: { params: Promise<{ todoId: string }> }) {
  const params = await props.params;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (!data?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id: params.todoId,
        userId: data.user.id,
      },
    });

    if (!todo) {
      return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(todo);
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}

export async function PATCH(req: Request, props: { params: Promise<{ todoId: string }> }) {
  const params = await props.params;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (!data?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = todoUpdateSchema.parse(json);

    const todo = await prisma.todo.update({
      where: {
        id: params.todoId,
        userId: data.user.id,
      },
      data: body,
    });

    return NextResponse.json(todo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse(null, { status: 500 });
  }
}

export async function DELETE({ params }: { params: { todoId: string } }) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (!data?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.todo.delete({
      where: {
        id: params.todoId,
        userId: data.user.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
