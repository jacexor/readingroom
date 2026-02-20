namespace ReadingRoom.Service
{
    public class ReadingTimeService : IReadingTimeService
    {
        public int GetReadingTime(string articleText)
        {
            // Define an average reading speed (e.g., 222 WPM from an example source)
            const decimal WordsPerMinute = 222m;

            // Define the separators for splitting words (space is essential)
            char[] separators = new char[] { ' ' };

            // Count the words by splitting the text and getting the array length, 
            // removing any empty entries that might result from extra spaces
            int wordCount = articleText
                .Split(separators, StringSplitOptions.RemoveEmptyEntries)
                .Length;

            // Calculate minutes and round up to the nearest whole minute
            int minutes = (int)Math.Ceiling(wordCount / WordsPerMinute);

            return minutes;
        }
    }
}
