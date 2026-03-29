export function AlertOverlay({
  type,
  message,
}: {
  type: 'loading' | 'error'
  message: string
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-6 w-[320px] text-center animate-fadeIn">
        
        {type === 'loading' && (
          <>
            <div className="w-12 h-12 border-4 border-[var(--border)] border-t-[var(--primary)] rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[var(--text)]">Loading</h3>
          </>
        )}

        {type === 'error' && (
          <>
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 rounded-full bg-red-100 text-red-600 text-xl">
              !
            </div>
            <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
              Error
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              {message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90"
            >
              Retry
            </button>
          </>
        )}

        {type === 'loading' && (
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Please wait...
          </p>
        )}
      </div>
    </div>
  )
}