import ReactMarkdown from "react-markdown";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { prisma } from "~/prisma.server";
import { Form, useLoaderData } from "@remix-run/react";
import { Button, Input, Textarea } from "@nextui-org/react";

export const loader = async (c: LoaderFunctionArgs) => {
  const postId = c.params.postId as string;
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Response("找不到文章", {
      status: 404,
    });
  }

  return json({
    post,
  });
};


export default function Page() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="p-12">
      <Form method="POST">
        <div className="flex flex-col gap-3">
          <Input label="slug" name="slug" defaultValue={loaderData.post.id} />
          <Input
            label="标题"
            name="title"
            defaultValue={loaderData.post.title}
          />
          <Textarea
            minRows={10}
            label="正文"
            name="content"
            defaultValue={loaderData.post.content}
          />
          <Button type="submit" color="primary">
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
}
