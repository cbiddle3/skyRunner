// Copyright 2024 Sarah Fidahussain

#include <iostream>
#include <cstdlib>
#include <node.h>
#include <string>
#include <random>
#include <node.h>
#include <vector>

namespace randomization {

using v8::Array;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::String;
using v8::Value;

struct Building {
    std::string name;
    int width;
    int height;

    Building(std::string n, int w, int h) : name(n), width(w), height(h) {}
};

void GetRandomBuilding(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

void GetRandomBuilding(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    std::vector<Building> buildingTypes;

    buildingTypes.push_back(Building("brown-building", 100, 130));
    buildingTypes.push_back(Building("cafe", 150, 85));
    buildingTypes.push_back(Building("green-building", 100, 170));
    buildingTypes.push_back(Building("soda-shop", 200, 90));
    buildingTypes.push_back(Building("sushi-building", 100, 150));

    std::mt19937 rng(std::random_device{}());
    std::uniform_int_distribution<int> dist(0, buildingTypes.size() - 1);
    int index = dist(rng);

    Building building = buildingTypes[index];

    Local<Array> result = Array::New(isolate, 3);

    result->Set(
        isolate->GetCurrentContext(), 0,
        String::NewFromUtf8(isolate, building.name.c_str()).ToLocalChecked());
    result->Set(
        isolate->GetCurrentContext(), 1,
        String::NewFromUtf8(isolate, std::to_string(building.width).c_str())
            .ToLocalChecked());
    result->Set(
        isolate->GetCurrentContext(), 2,
        String::NewFromUtf8(isolate, std::to_string(building.height).c_str())
            .ToLocalChecked());

    args.GetReturnValue().Set(result);
}

void GetRandomGap(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate(); 
    std::mt19937 rng(std::random_device{}());
    std::uniform_int_distribution<int> dist(90, 160);
  
    int gap = dist(rng);
    auto rtngap = Number::New(isolate, gap); 
    args.GetReturnValue().Set(rtngap);
}

void Init(Local<Object> exports) {
    NODE_SET_METHOD(exports, "GetRandomBuilding", GetRandomBuilding);
    NODE_SET_METHOD(exports, "GetRandomGap", GetRandomGap);
}

NODE_MODULE(randomization, Init)
}  // namespace randomization
