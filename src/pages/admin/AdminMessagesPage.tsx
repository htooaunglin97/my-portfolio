import { format } from "date-fns";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { Skeleton } from "@/components/ui/Skeleton";
import { useMessages } from "@/features/contact/hooks/useMessages";

export function AdminMessagesPage() {
  const messagesQuery = useMessages();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Messages</h1>
      {messagesQuery.isLoading ? <Skeleton className="h-64 w-full" /> : null}
      {messagesQuery.error ? <ErrorState message={messagesQuery.error.message} /> : null}
      {messagesQuery.data && messagesQuery.data.length === 0 ? <EmptyState message="No messages yet." /> : null}
      <div className="space-y-4">
        {messagesQuery.data?.map((message) => (
          <Card key={message.id}>
            <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted">
              <span>{message.name}</span>
              <span>{message.email}</span>
              <span>{format(new Date(message.created_at), "MMM d, yyyy HH:mm")}</span>
            </div>
            <p className="text-slate-200">{message.message}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

