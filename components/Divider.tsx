// Divider Component
// Ghanbari

type DividerType = {
  label?: React.ReactNode | null;
  href?: string | null;
  onClick?: (() => void) | null;
  container_class?: string;
  label_class?: string;
  left_divider_class?: string;
  right_divider_class?: string;
};

export default function Divider({
  label = null,
  href = null,
  onClick = null,
  container_class = " gap-2 my-4",
  label_class = "text-sky-600 text-center font-bold p-2",
  left_divider_class = "flex-1 border-0 rounded-sm w-full h-1 from-pink-500 to-sky-500 bg-gradient-to-r",
  right_divider_class = "flex-1 border-0 rounded-sm w-full h-1 from-pink-500 to-sky-500 bg-gradient-to-l",
}: DividerType) {
  return (
    <div
      dir="rtl"
      className={`flex flex-row items-center justify-center ${container_class}`}
    >
      <div className={left_divider_class}></div>

      {label && (
        <>
          {href ? (
            <a
              href={href}
              draggable={false}
              className={`inline-block select-none ${label_class}`}
            >
              {label}
            </a>
          ) : onClick ? (
            <button
              type="button"
              onClick={onClick}
              draggable={false}
              className={`inline-block select-none ${label_class}`}
            >
              {label}
            </button>
          ) : (
            <p
              draggable={false}
              className={`inline-block select-none ${label_class}`}
            >
              {label}
            </p>
          )}

          <div className={right_divider_class}></div>
        </>
      )}
    </div>
  );
}
