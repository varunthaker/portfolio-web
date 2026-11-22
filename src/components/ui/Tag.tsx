export function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-md border border-border bg-bg-elev px-2 py-0.5 font-mono text-[11px] text-muted">
      {children}
    </span>
  )
}
