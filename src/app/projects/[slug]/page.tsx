import React from "react";

const Projectpage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return <div>Projectpage: {slug}</div>;
};

export default Projectpage;
