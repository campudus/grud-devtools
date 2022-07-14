{
  inputs = {
    dream2nix.url = "github:nix-community/dream2nix";
    nixpkgs.url = "github:nixos/nixpkgs";
    nixpkgs.follows = "nixpkgs";
  };

  outputs = { self, dream2nix, nixpkgs }@inp:
    (dream2nix.lib.makeFlakeOutputs {
      systems = [ "x86_64-linux" ];
      config.projectRoot = ./.;
      source = ./.;
    }) // {
      apps.x86_64-linux.checks = {
        type = "app";
        program =
          "${self.packages.x86_64-linux.default}/lib/node_modules/grud-devtools/node_modules/jest/bin/jest.js";
      };
    };
}
