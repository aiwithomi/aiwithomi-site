type BrandMarkProps = {
  onInk?: boolean;
  showName?: boolean;
};

export function BrandMark({ onInk = false, showName = true }: BrandMarkProps) {
  return (
    <span className={`brand-lockup${onInk ? ' brand-lockup--on-ink' : ''}`}>
      <span className="brand-ao" aria-hidden="true">
        A<em>/</em>O
      </span>
      {showName && <span className="brand-name">AIwithOmi</span>}
    </span>
  );
}
