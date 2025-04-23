export default function Button({ disabled, className, onClick, children }) {
  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {children}
    </button>
  );
}
