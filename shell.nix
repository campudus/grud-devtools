{ pkgs ? import <nixpkgs> { } }:

with pkgs;

let root = builtins.toString ./.;
in mkShell {
  buildInputs = with pkgs; [ nodejs-16_x ];
  shellHook = ''
    echo ROOT ${root}
    export PATH=${root}/node_modules/.bin:$PATH
  '';
}
