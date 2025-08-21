import React from 'react';

export default function Footer() {
  return (
    <footer className="text-light text-center py-3" style={{ backgroundColor: '#000', position: 'fixed', bottom: 0, width: '100%' }}>
      <p className="container">
        <small>© 2023 Health Coach Application. All rights reserved.</small>
      </p>
    </footer>
  );
}
