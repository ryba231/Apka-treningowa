package com.aplikacja_treningowa;

import android.app.Application;
import com.facebook.react.ReactApplication;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import org.pgsqlite.SQLitePluginPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {

            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new ReactNativePushNotificationPackage() // <---- Add the Package
            );
        }
    };

    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
            new ReactNativePushNotificationPackage(),
                new VectorIconsPackage(),
                new LinearGradientPackage(),
                new SQLitePluginPackage()   // register SQLite Plugin here
                // eg. new VectorIconsPackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}