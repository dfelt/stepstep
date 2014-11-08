//
//  Pedometer.m
//  Copyright (c) 2014 Lee Crossley - http://ilee.co.uk
//

#import "Cordova/CDV.h"
#import "Cordova/CDVViewController.h"
#import "CoreMotion/CoreMotion.h"
#import "Pedometer.h"

@interface Pedometer ()
    @property (nonatomic, strong) CMPedometer *pedometer;
@end

@implementation Pedometer

- (void) isStepCountingAvailable:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:[CMPedometer isStepCountingAvailable]];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) isDistanceAvailable:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:[CMPedometer isDistanceAvailable]];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) isFloorCountingAvailable:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:[CMPedometer isFloorCountingAvailable]];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) startPedometerUpdates:(CDVInvokedUrlCommand*)command;
{
    if (!self.pedometer) self.pedometer = [[CMPedometer alloc] init];

    [self.pedometer startPedometerUpdatesFromDate:[NSDate date] withHandler:^(CMPedometerData *pedometerData, NSError *error) {
        dispatch_async(dispatch_get_main_queue(), ^{
            CDVPluginResult* pluginResult = nil;
            
            if (error)
            {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
            }
            else
            {
                NSDictionary* pedestrianData = @{
                    @"numberOfSteps": pedometerData.numberOfSteps,
                    @"distance": pedometerData.distance,
                    @"floorsAscended": pedometerData.floorsAscended,
                    @"floorsDescended": pedometerData.floorsDescended
                };
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:pedestrianData];
                [pluginResult setKeepCallbackAsBool:true];
            }

            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        });
    }];
}

- (void) stopPedometerUpdates:(CDVInvokedUrlCommand*)command;
{
    [self.pedometer stopPedometerUpdates];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) queryPedometerDataFromDate:(CDVInvokedUrlCommand*)command;
{
    if (!self.pedometer) self.pedometer = [[CMPedometer alloc] init];
    
    NSString* timeStr = [command.arguments objectAtIndex:0 withDefault:@"0"];
    double time = timeStr.doubleValue / 1000;
    NSDate* from = [NSDate dateWithTimeIntervalSince1970:time];
    NSDate* to = [NSDate date];
    NSLog(@"From %@ to %@", [from description], [to description]);

    [self.pedometer queryPedometerDataFromDate: from toDate: to withHandler: ^(CMPedometerData *pedometerData, NSError *error)
    {
         dispatch_async(dispatch_get_main_queue(), ^{
             CDVPluginResult* pluginResult = nil;
             
             if (error)
             {
                 NSLog(@"%@\n", [error localizedDescription]);
                 pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
             }
             else
             {
                 NSDictionary* pedestrianData = @{
                    @"numberOfSteps": pedometerData.numberOfSteps,
                    @"distance": pedometerData.distance,
                    @"floorsAscended": pedometerData.floorsAscended,
                    @"floorsDescended": pedometerData.floorsDescended
                 };
                 pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:pedestrianData];
                 [pluginResult setKeepCallbackAsBool:true];
             }
             
             [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
         });
     }];
}

@end
