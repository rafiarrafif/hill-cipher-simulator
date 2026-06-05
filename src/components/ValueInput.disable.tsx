import { CircleX } from "lucide-react";

const ValueInputDisable = () => {
  return (
    <div className="text-neutral-400 flex flex-col items-center gap-1 my-10">
      <CircleX size={32} />
      <span>Verifikasi kunci terlebih dahulu!</span>
    </div>
  );
};

export default ValueInputDisable;
