import toast from "react-hot-toast";


export const showCodeToast = (message: string, code: any, styleText: string) => {
  toast(
    (t) => (
      <div>
        <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: `var(--color-${styleText})` }}>
          {message}
        </p>

        {/* Bloco de Código Estilizado */}
        <pre style={{
          background: 'var(--color-base-200)',
          color: `var(--color-${styleText})`,
          padding: '12px',
          borderRadius: '6px',
          overflowX: 'auto',
          fontSize: '13px',
          fontFamily: 'Courier New, Courier, monospace',
          margin: 0,
          textAlign: 'left'
        }}>
          <code>
            {`${JSON.stringify(code, null, 2)}`}
          </code>
        </pre>
      </div>
    ),
    {
      duration: 5000, // Dá mais tempo para o usuário ler o código
      style: {
        maxWidth: '450px', // Alarga o toast para o código não quebrar linha à toa
        width: 'auto',
      },
    }
  );
};