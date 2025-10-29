const Shimmer = () => {
  return (
    <div className="flex gap-4 items-center">
      <div className="w-10 h-10 rounded-lg relative overflow-hidden bg-gray-200">
        <div className="absolute inset-0 w-[200%] -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </div>

      <div className="flex flex-col gap-1">
        <div className="w-50 md:w-72 h-3 rounded-lg relative overflow-hidden bg-gray-200">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
        <div className="w-40 h-3 rounded-lg relative overflow-hidden bg-gray-200">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
