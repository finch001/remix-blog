import { Button, Input, Textarea } from "@nextui-org/react";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { prisma } from "~/prisma.server";

export const action = async (c: ActionFunctionArgs) => {
  const formData = await c.request.formData();

  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!slug) {
    return json({
      success: false,
      errors: {
        slug: "必须填写 slug",
        title: "",
        content: "",
      },
    });
  }
  if (!title) {
    return json({
      success: false,
      errors: {
        slug: "",
        title: "必须填写标题",
        content: "",
      },
    });
  }
  if (!content) {
    return json({
      success: false,
      errors: {
        slug: "",
        title: "",
        content: "必须填写内容",
      },
    });
  }

  await prisma.post.create({
    data: {
      id: slug,
      title,
      content,
    },
  });

  return redirect("/");
};

export default function Page() {
  const actionData = useActionData(typeof action);
  const navigation = useNavigation();
  const errors = actionData?.errors;

  return (
    <div>
      <Form method="post">
        <div className="flex flex-col gap-3 p-12">
          <h1 className="text-xl font-black">Post new article</h1>
          <Input
            isInvalid={!!errors?.slug}
            errorMessage={errors?.slug}
            name="slug"
            label="slug"
          />
          <Input
            isInvalid={!!errors?.title}
            errorMessage={errors?.title}
            name="title"
            label="article title"
          />
          <Textarea
            isInvalid={!!errors?.content}
            errorMessage={errors?.content}
            name="content"
            label="content"
          />
          <Button
            isLoading={navigation.state === "submitting"}
            type="submit"
            color="primary"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
