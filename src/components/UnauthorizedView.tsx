import { useNavigate } from "@tanstack/react-router";

export function UnauthorizedView() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)] pt-24 sm:pt-32 pb-16 sm:pb-24 flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md relative">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[var(--crimson)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[var(--amber)]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Card */}
        <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-[var(--shadow-card)] border border-[var(--ink)]/5 overflow-hidden text-center">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--crimson)] via-[var(--amber)] to-[var(--crimson)]" />

          {/* Icon */}
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 animate-pulse"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="font-display text-2xl sm:text-3xl text-[var(--maroon)] mb-3">
            You seem lost
          </h1>
          <p className="text-[var(--ink)]/65 text-sm font-medium leading-relaxed mb-8">
            You don't have permission to access the Admin Dashboard. Let's get you back to where you
            belong.
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => navigate({ to: "/" })}
              className="w-full h-12 sm:h-14 rounded-full bg-gradient-to-r from-[var(--crimson)] to-[var(--maroon)] text-white font-bold text-base hover:shadow-lg hover:shadow-[var(--crimson)]/20 transition duration-200 flex items-center justify-center gap-2 group"
            >
              Go to Home Page
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>

            <button
              onClick={() => navigate({ to: "/shop" })}
              className="w-full h-12 sm:h-14 rounded-full bg-white border border-[var(--ink)]/10 text-[var(--ink)]/80 hover:bg-[var(--cream)]/30 font-bold text-base transition duration-200"
            >
              Browse Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
