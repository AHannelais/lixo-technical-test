/* Original code



// Stop using var, use let or const
var urls = [
// Using single key objects when the key is the same is unnecessary, use simple arrays
  { url: "https://jsonplaceholder.typicode.com/posts/1" },
  { url: "https://jsonplaceholder.typicode.com/posts/2" },
  { url: "https://jsonplaceholder.typicode.com/posts/3" },
];

// Declare i if you are going to assign it a value
for (i = 0; i <= urls.length; i++) {

// Declare response  
// Fetch is a promise, you need to resolve it
// response is not a readable content, you need to extract the json
  response = fetch(urls[i])
// You should not mutate the original array, create a new one
  urls[i] = response;
}
// should display a list of posts
console.log(urls);
*/

// Fixed code with most minimal changes
// (it's wrapped in a function  prevent name duplicates errors)
() => {
  var urls = [
    { url: "https://jsonplaceholder.typicode.com/posts/1" },
    { url: "https://jsonplaceholder.typicode.com/posts/2" },
    { url: "https://jsonplaceholder.typicode.com/posts/3" },
  ];

  (async () => {
    for (let i = 0; i < urls.length; i++) {
      const response = await fetch(urls[i].url).then((response) =>
        response.json()
      );
      // Technically it works but it's better not mutate the original array and create a new one
      urls[i] = response;
    }
    // should display a list of posts
    console.log(urls);
  })();
};

// Optimized code
// (it's wrapped in a function  prevent name duplicates errors)
() => {
  interface PlaceholderPost {
    id: number;
    title: string;
    body: string;
    userId: number;
  }

  const urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
    "https://jsonplaceholder.typicode.com/posts/3",
  ];

  // Replace any with the actual type ex type you expect
  async function fetchData(urls: string[]): Promise<PlaceholderPost[]> {
    try {
      const promises = urls.map((url) =>
        fetch(url).then((response) => response.json())
      );

      // This allows to fetch all simultaneously
      const data = await Promise.all(promises);
      console.log(data);

      return data;
    } catch (error) {
      // Handle errors
      console.error("An error occurred:", error);
      return [];
    }
  }

  fetchData(urls);
};
