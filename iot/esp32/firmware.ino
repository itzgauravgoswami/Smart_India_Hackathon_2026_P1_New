/*
 * SwaLoop Smart Station Firmware — ESP32 + Ultrasonic HC-SR04
 * Every waste event. One verified loop.
 */

#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "CAMPUS_IOT_WIFI";
const char* password = "CAMPUS_WIFI_KEY";
const char* serverUrl = "http://192.168.1.100:5000/api/stations/WS-004/simulate";

const int trigPin = 5;
const int echoPin = 18;
const float binHeightCm = 100.0; // Total hopper depth

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected to SwaLoop Campus Mesh.");
}

void loop() {
  // Trigger ultrasonic pulse
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  float distanceCm = duration * 0.034 / 2;

  // Calculate fill percentage
  float fillDepth = binHeightCm - distanceCm;
  int fillLevel = constrain((int)((fillDepth / binHeightCm) * 100), 0, 100);

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    String payload = "{\"fillLevel\":" + String(fillLevel) + ",\"sensorStatus\":\"online\"}";
    int httpResponseCode = http.POST(payload);

    Serial.print("Dispatched Fill Level: ");
    Serial.print(fillLevel);
    Serial.print("% | HTTP Response: ");
    Serial.println(httpResponseCode);

    http.end();
  }

  // Sample every 10 seconds
  delay(10000);
}
