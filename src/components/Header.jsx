const brandStyle=  {
  backgroundColor: '#A8F0D1',
  borderRadius: '10px',
  padding: '5px'
}

function Header() {
  return (
    <div>
      <h1 className="display-2">
        Welcome to{' '} 
        <span style={brandStyle}>LootLab</span>
      </h1>
      <p className="lead fs-4">Find it. Love it. Loot it!</p>
    </div>
  );
}

export default Header;