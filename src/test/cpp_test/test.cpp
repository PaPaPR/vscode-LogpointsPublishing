#include <iostream>
#include <thread>
#include <chrono>
#include <random>

// 每秒增加一次count值的函数
void incrementCount() {
    while (true) {
        auto start = std::chrono::high_resolution_clock::now();
        auto start_dur = start.time_since_epoch();
        auto seconds_since_epoch = std::chrono::duration_cast<std::chrono::milliseconds>(start_dur).count();

        std::this_thread::sleep_for(std::chrono::milliseconds(10));
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
        auto dur = duration.count();
    }
}

int main() {
    std::thread t(incrementCount);

    std::cin.get(); 

    return 0;
}