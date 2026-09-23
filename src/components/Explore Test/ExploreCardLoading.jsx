export default function ExploreCardLoading() {
  return (
    <>
      <div className="bg-card animate-pulse cursor-wait rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
        {/* BEGIN: Hero Image Section */}
        <div className="relative w-full aspect-478/260 overflow-hidden">
          {/* Main Image Placeholder with Shimmer */}
          <div
            className="w-full h-full skeleton"
            data-purpose="image-placeholder"
          />
          {/* Overlay Tags */}
          <div className="absolute top-4 left-4">
            <span className="bg-indigo-500/80 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
              MCQ
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <div className="w-6 h-6 bg-white/20 rounded-full backdrop-blur-sm" />
          </div>
        </div>
        {/* END: Hero Image Section */}
        {/* BEGIN: Card Content */}
        <div className="p-6 space-y-6">
          {/* Title Skeleton */}
          <div className="space-y-2">
            {/* Main Title Line */}
            <div
              className="h-8 w-3/4 skeleton rounded-lg"
              data-purpose="title-skeleton"
            />
          </div>
          {/* Metadata Row (25, 15 min, 4.8) */}
          <div className="flex items-center space-x-6">
            {/* Questions Count */}
            <div className="h-5 w-8 skeleton rounded" data-purpose="meta-1" />
            {/* Time Duration */}
            <div className="h-5 w-16 skeleton rounded" data-purpose="meta-2" />
            {/* Rating */}
            <div className="h-5 w-10 skeleton rounded" data-purpose="meta-3" />
          </div>
          {/* Action Button */}
          <div className="pt-2">
            <button
              className="w-full bg-primary/50 text-dark font-bold py-4 rounded-2xl transition-all flex items-center justify-center"
              data-purpose="primary-button"
              disabled
            >
              <span className="opacity-50 text-primary-foreground">Start Test</span>
            </button>
          </div>
        </div>
        {/* END: Card Content */}
      </div>
    </>
  );
}
