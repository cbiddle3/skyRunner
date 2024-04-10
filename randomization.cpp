#include <iostream>
#include <cstdlib>
#include <ctime>
#include <vector>
#include <string>

struct Building {
    std::string name; 
    int width;
    int height; 

    Building(std::string n, int w, int h) : name(n), width(w), height(h) {}
}; 

Building getRandomBuilding() {
    std::vector<Building> buildingTypes;
    buildingTypes.push_back(Building("BrownBuilding", 100, 130));
    buildingTypes.push_back(Building("Cafe", 150, 85));
    buildingTypes.push_back(Building("GreenBuilding", 100, 170));
    buildingTypes.push_back(Building("SodaShop", 200, 90));
    buildingTypes.push_back(Building("SushiBuilding", 100, 150));

    std::srand(std::time(nullptr));

    int index = std::rand() % buildingTypes.size();

    return buildingTypes[index];
}

int getRandomGap() {
    std::srand(std::time(nullptr));

    return std::rand() % 31 + 20; 
}

int main() {
    Building building = getRandomBuilding();
    int gap = getRandomGap();

    std::cout << "Building Name: " << building.name << std::endl; 
    std::cout << "Width: " << building.width << std::endl; 
    std::cout << "Height: " << building.height << std::endl; 
    std::cout << "Gap: " << gap << std::endl; 

    return 0; 
}