package com.main;

public class MainActivity extends android.app.Activity   
{
    @Override  
    public void onCreate(final android.os.Bundle savedInstanceState)   
    {
        super.onCreate(savedInstanceState);
        super.startActivity(new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse("https://www.alexamaster.net/ads/autosurf/180120")));
    }  
}
