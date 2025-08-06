export function Burger() {
  return <div className="Burger">B</div>;
}

export function Header() {
  return (
    <header className="Header">
      <div className="container">
        <Burger />
      </div>
    </header>
  );
}
