interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message = "Something went wrong." }: ErrorStateProps) {
  return (
    <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
      {message}
    </div>
  );
}

