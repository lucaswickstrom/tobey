module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@tobey/db", "@tobey/icons"],
  images: {
    domains: [
      "localhost",
      // TODO
      "bwdxzbxyjnpexvebpfdi.supabase.co",
      "temqbrdouscfgwydywla.supabase.co",
    ],
  },
  poweredByHeader: false,
  redirects: () => [
    {
      source: "/aimo-regeringsgatan",
      has: [{ type: "host", value: "qr.tobey.io" }],
      destination:
        "https://tobey.io/sites/a0e3b633-1e85-45de-90e1-6b9e317556c1?utm_source=box&utm_medium=qr&utm_campaign=pilot",
      permanent: false,
    },
    {
      source: "/optimera-nacka-varmdo",
      has: [{ type: "host", value: "qr.tobey.io" }],
      destination:
        "https://tobey.io/sites/dcd0874c-13da-4d1a-b5bc-771596104680?utm_source=box&utm_medium=qr&utm_campaign=pilot",
      permanent: false,
    },
    {
      source: "/optimera-arsta",
      has: [{ type: "host", value: "qr.tobey.io" }],
      destination:
        "https://tobey.io/sites/64e19589-d715-4b41-9cc1-73bd45297909?utm_source=box&utm_medium=qr&utm_campaign=pilot",
      permanent: false,
    },
    {
      source: "/optimera-taby",
      has: [{ type: "host", value: "qr.tobey.io" }],
      destination:
        "https://tobey.io/sites/acbe7050-b0ef-4f62-815b-6de09b4a7bab?utm_source=box&utm_medium=qr&utm_campaign=pilot",
      permanent: false,
    },
    {
      source: "/:path*",
      has: [{ type: "host", value: "qr.tobey.io" }],
      destination: "https://tobey.io",
      permanent: false,
    },
  ],
};
