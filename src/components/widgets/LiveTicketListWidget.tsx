'use client';

import { TicketListDemo } from '@/components/tickets/TicketListDemo';

export function LiveTicketListWidget() {
  return (
    <div className="my-4">
      <TicketListDemo limit={20} autoRefresh={false} />
    </div>
  );
}
