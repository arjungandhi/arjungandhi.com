{
  description = "arjungandhi.com";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      packages.${system}.default = pkgs.stdenv.mkDerivation {
        name = "arjungandhi.com";
        src = ./.;
        nativeBuildInputs = [ pkgs.hugo ];
        buildPhase = ''
          hugo --minify
        '';
        installPhase = ''
          cp -r public $out
        '';
      };
    };
}
