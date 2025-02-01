import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center">
        <Loader2 className="w-12 h-12 text-black animate-spin" />
        <p className="text-black mt-2">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
