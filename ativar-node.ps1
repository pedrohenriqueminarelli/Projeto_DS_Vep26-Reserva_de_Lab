# ativar-node.ps1
# Baixa o Node portatil (so na primeira vez neste computador)
# e deixa node, npm e npx disponiveis no terminal atual.
#
# Como usar, em todo terminal novo, na pasta do repositorio:
#   Set-ExecutionPolicy -Scope Process Bypass
#   . .\ativar-node.ps1

$versao    = "v24.21.0"
$destino   = "$env:USERPROFILE\node-portable"
$pastaNode = "$destino\node-$versao-win-x64"

if (-not (Test-Path "$pastaNode\node.exe")) {
    Write-Host "Node nao encontrado neste computador. Baixando $versao..."

    # nodejs.org exige TLS 1.2; a barra de progresso deixa o download muito lento
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $ProgressPreference = 'SilentlyContinue'

    New-Item -ItemType Directory -Force -Path $destino | Out-Null
    $zip = "$destino\node.zip"
    Invoke-WebRequest "https://nodejs.org/dist/$versao/node-$versao-win-x64.zip" -OutFile $zip

    Write-Host "Extraindo..."
    Expand-Archive $zip -DestinationPath $destino -Force
    Remove-Item $zip
}

$env:Path = "$pastaNode;" + $env:Path

Write-Host "Pronto! Node $(node -v) e npm $(npm.cmd -v) ativos neste terminal."
