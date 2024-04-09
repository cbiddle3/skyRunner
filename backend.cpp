#include <httplib.h>

using namespace httplib;

// function to concatenate a string of headers (NOT SURE HOW IMPORTANT THIS WILL BE IN THE FUTURE BUT IT IS USED IN THE LOG FUNCTION)
std::string dump_headers(const Headers &headers) {
  std::string s;
  char buf[BUFSIZ];

  for (auto it = headers.begin(); it != headers.end(); ++it) {
    const auto &x = *it;
    snprintf(buf, sizeof(buf), "%s: %s\n", x.first.c_str(), x.second.c_str());
    s += buf;
  }

  return s;
}


// function to create a log message containing HTTP request and response
std::string log(const Request &req, const Response &res) {
  std::string s;
  char buf[BUFSIZ];

  s += "================================\n";

  snprintf(buf, sizeof(buf), "%s %s %s", req.method.c_str(),
           req.version.c_str(), req.path.c_str());
  s += buf;

  std::string query;
  for (auto it = req.params.begin(); it != req.params.end(); ++it) {
    const auto &x = *it;
    snprintf(buf, sizeof(buf), "%c%s=%s",
             (it == req.params.begin()) ? '?' : '&', x.first.c_str(),
             x.second.c_str());
    query += buf;
  }
  snprintf(buf, sizeof(buf), "%s\n", query.c_str());
  s += buf;

  s += dump_headers(req.headers);

  s += "--------------------------------\n";

  snprintf(buf, sizeof(buf), "%d %s\n", res.status, res.version.c_str());
  s += buf;
  s += dump_headers(res.headers);
  s += "\n";

  if (!res.body.empty()) { s += res.body; }

  s += "\n";

  return s;
}

// Function to calculate the score based on request data
int calculate_score(const Request& req) {
    int score = 10000; //dummy score
    return score;
}

int main() {
    Server svr;

    // Route handler to calculate and return the score
    svr.Get("/calculate_score", [](const Request& req, Response& res) {
        int score = calculate_score(req);
        res.set_content("Score: " + std::to_string(score), "text/plain");
    });

    // Error handler that handles potential errors that may occur during HTTP requests
    svr.set_error_handler([](const Request & /*req*/, Response &res) {
        const char *fmt = "<p>Error Status: <span style='color:red;'>%d</span></p>";
        char buf[BUFSIZ];
        snprintf(buf, sizeof(buf), fmt, res.status);
        res.set_content(buf, "text/html");
    });

    // Logger setter for the HTTP server
    svr.set_logger([](const Request &req, const Response &res) {
        printf("%s", log(req, res).c_str());
    });

    svr.listen("localhost", 8080);

    return 0;
}
