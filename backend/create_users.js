const users = [
  {name: "Admin Test", email: "admin@pasinfo.com", password: "pasinfo123", role: "admin"},
  {name: "Penulis Test", email: "penulis@pasinfo.com", password: "pasinfo123", role: "penulis"},
  {name: "Editor Test", email: "editor@pasinfo.com", password: "pasinfo123", role: "editor"}
];

users.forEach(async (u) => {
  const res = await fetch('http://localhost:8080/api/v1/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(u)
  });
  const data = await res.json();
  console.log(u.email, data);
});
