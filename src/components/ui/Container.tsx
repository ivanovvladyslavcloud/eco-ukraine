export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={styles.container}>
      {children}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "20px",
  },
};