const dns = require("dns");

dns.lookup("pluralsight.com", (err, address) => {
  console.log(address);
});

dns.resolve4("pluralsight.com", (err, address) => {
  console.log(address);
});

dns.resolve4("pluralsight.com", "MX", (err, address) => {
  console.log(address);
});

dns.resolveMx("pluralsight.com", (err, address) => {
  console.log(address);
});

dns.reverse("54.186.225.67", (err, hostname) => {
  console.log(hostname);
});