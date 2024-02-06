import { Button, Input } from "@nextui-org/react";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { prisma } from "~/prisma.server";

export const action = async (c: ActionFunctionArgs) => {
  const formData = await c.request.formData();

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  await prisma.user.create({
    data: {
      username,
      password,
    },
  });

  return redirect("/signin");
};

export default function Page() {
  return (
    <Form method="POST">
      <div className="p-12 flex flex-col gap-3">
        <Input label="username" name="username" />
        <Input type="password" label="password" name="password" />
        <Button type="submit" color="primary">
          Register
        </Button>
      </div>
    </Form>
  );
}
