package com.moneymindmobileapp

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.bridge.Arguments

class MainActivity : ReactActivity() {

  /**
   * Required for react-native-gesture-handler
   */
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    // Handle deep link if app was launched from a deep link
    intent?.data?.let { handleDeepLink(it) }
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "MoneyMind"

  /**
   * Handle new intents for deep linking
   */
  override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    intent.data?.let { handleDeepLink(it) }
  }

  private fun handleDeepLink(uri: Uri) {
    try {
      when {
        // If it's a Plaid redirect
        uri.toString().contains("plaid-redirect") -> {
          println("Plaid deep link detected: ${uri.toString()}")
          // Handle the Plaid redirect directly
          sendDeepLinkToJS(uri.toString())
        }
        // If it's a Play Store link
        uri.toString().startsWith("market://") || 
        uri.toString().startsWith("https://play.google.com") -> {
          // Redirect back to the app using your custom scheme
          val localAppIntent = Intent(Intent.ACTION_VIEW).apply {
            data = Uri.parse("moneymind://plaid-redirect")
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
          }
          startActivity(localAppIntent)
        }
      }
    } catch (e: Exception) {
      println("Deep link handling error: ${e.message}")
      // Fallback to local app
      try {
        val fallbackIntent = Intent(Intent.ACTION_VIEW).apply {
          data = Uri.parse("moneymind://plaid-redirect")
          addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
        }
        startActivity(fallbackIntent)
      } catch (e: Exception) {
        println("Fallback handling error: ${e.message}")
      }
    }
  }

  /**
   * Send deep link data to JavaScript
   */
  private fun sendDeepLinkToJS(deepLink: String) {
    reactInstanceManager.currentReactContext
      ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      ?.emit("onDeepLink", deepLink)
  }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
