interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-border bg-surface/70 p-6 text-center text-sm text-muted">
      {message}
    </div>
  );
}

