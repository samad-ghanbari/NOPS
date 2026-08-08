"use client";

export default function DisableContextMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
  // onContextMenu={(e) => e.preventDefault()}
}
