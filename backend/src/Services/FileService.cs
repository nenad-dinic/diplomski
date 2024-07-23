namespace API.Services;

public class FileService() {

    public bool CreateDirectoryFromPath(string path) {

        try {
            string? directory = Path.GetDirectoryName(path);

            if(directory == null) {
                return false;
            }

            if(!Directory.Exists(directory)) {
                Directory.CreateDirectory(directory);
            }

            return true;

        } catch {
            return false;
        }

    }

    public async Task<bool> WriteFile(string path, Stream data) {

        CreateDirectoryFromPath(path);

        try {
            FileStream fileStream = File.Create(path);
            await data.CopyToAsync(fileStream);
            fileStream.Close();
            return true;
        } catch {
            return false;
        }

    }

    public async Task<Stream?> ReadFile(string path) {

        try {
            FileStream fileStream = File.OpenRead(path);
            MemoryStream memoryStream = new();
            await fileStream.CopyToAsync(memoryStream);
            fileStream.Close();
            return memoryStream;
        } catch {
            return null;
        }

    }

}