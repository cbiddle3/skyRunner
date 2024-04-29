import { http, HttpResponse } from 'msw'
 
export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('/api/random-building-data', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      "data": [
        [
            "green-building",
            "100",
            "170"
        ],
        [
            "brown-building",
            "100",
            "130"
        ],
        [
            "sushi-building",
            "100",
            "150"
        ],
        [
            "green-building",
            "100",
            "170"
        ],
        [
            "sushi-building",
            "100",
            "150"
        ],
        [
            "sushi-building",
            "100",
            "150"
        ],
        [
            "green-building",
            "100",
            "170"
        ],
        [
            "soda-shop",
            "200",
            "90"
        ],
        [
            "sushi-building",
            "100",
            "150"
        ],
        [
            "soda-shop",
            "200",
            "90"
        ]
    ]
    })
  }),
  http.get('/api/random-gap', () => {

    return HttpResponse.json({
      "randGaps":[151,131,126,98,121,114,154,95,139,110]
    })
  })
]