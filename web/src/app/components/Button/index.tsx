type ButtonProps = {
  label: string;
  onClick: () => void;
};

export function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      className="flex h-10 px-4 py-2 justify-center items-center gap-2 rounded-md outline-none border-none cursor-pointer bg-white text-black uppercase font-sans"
      onClick={onClick}
    >
      <span>{label}</span>
    </button>
  );
}
