import { Video, VideoInsert, VideoUpdate } from "@/types";
import { supabase } from "@/utils/supabase";

/**
 * Lấy tất cả videos
 * @returns Danh sách video
 */
export async function getVideos(): Promise<Video[]> {
  const { data, error } = await supabase
    .from("Videos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching videos:", error);
    return [];
  }

  return data || [];
}

/**
 * Lấy thông tin chi tiết của một video
 * @param videoId ID của video
 * @returns Thông tin chi tiết của video hoặc null nếu không tìm thấy
 */
export async function getVideoById(videoId: number): Promise<Video | null> {
  const { data, error } = await supabase
    .from("Videos")
    .select("*")
    .eq("video_id", videoId)
    .single();

  if (error) {
    console.error("Error fetching video:", error);
    return null;
  }

  return data;
}

/**
 * Thêm một video mới
 * @param video Thông tin video cần thêm
 * @returns Video đã được thêm hoặc null nếu có lỗi
 */
export async function addVideo(video: VideoInsert): Promise<Video | null> {
  const { data, error } = await supabase
    .from("Videos")
    .insert(video)
    .select()
    .single();

  if (error) {
    console.error("Error adding video:", error);
    return null;
  }

  return data;
}

/**
 * Cập nhật thông tin của một video
 * @param videoId ID của video cần cập nhật
 * @param updates Thông tin cần cập nhật
 * @returns Video đã được cập nhật hoặc null nếu có lỗi
 */
export async function updateVideo(
  videoId: number,
  updates: Partial<VideoUpdate>
): Promise<Video | null> {
  const { data, error } = await supabase
    .from("Videos")
    .update(updates)
    .eq("video_id", videoId)
    .select()
    .single();

  if (error) {
    console.error("Error updating video:", error);
    return null;
  }

  return data;
}

/**
 * Xóa một video
 * @param videoId ID của video cần xóa
 * @returns true nếu xóa thành công, false nếu có lỗi
 */
export async function deleteVideo(videoId: number): Promise<boolean> {
  const { error } = await supabase
    .from("Videos")
    .delete()
    .eq("video_id", videoId);

  if (error) {
    console.error("Error deleting video:", error);
    return false;
  }

  return true;
}

/**
 * Tìm kiếm video theo tiêu đề
 * @param query Từ khóa tìm kiếm
 * @returns Danh sách video phù hợp với từ khóa
 */
export async function searchVideos(query: string): Promise<Video[]> {
  const { data, error } = await supabase
    .from("Videos")
    .select("*")
    .or(`title_ko.ilike.%${query}%,title_vi.ilike.%${query}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error searching videos:", error);
    return [];
  }

  return data || [];
}

/**
 * Lấy videos theo độ khó
 * @param difficultyLevel Độ khó của video
 * @returns Danh sách video có độ khó tương ứng
 */
export async function getVideosByDifficulty(
  difficultyLevel: string
): Promise<Video[]> {
  const { data, error } = await supabase
    .from("Videos")
    .select("*")
    .eq("difficulty_level", difficultyLevel)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching videos by difficulty:", error);
    return [];
  }

  return data || [];
}

/**
 * Lấy video theo kênh YouTube
 * @param channelName Tên kênh YouTube
 * @returns Danh sách video từ kênh đó
 */
export async function getVideosByChannel(
  channelName: string
): Promise<Video[]> {
  const { data, error } = await supabase
    .from("Videos")
    .select("*")
    .eq("channel_name", channelName)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching videos by channel:", error);
    return [];
  }

  return data || [];
}

/**
 * Lấy video có thời lượng trong khoảng nhất định
 * @param minDuration Thời lượng tối thiểu (giây)
 * @param maxDuration Thời lượng tối đa (giây)
 * @returns Danh sách video có thời lượng phù hợp
 */
export async function getVideosByDuration(
  minDuration: number,
  maxDuration: number
): Promise<Video[]> {
  const { data, error } = await supabase
    .from("Videos")
    .select("*")
    .gte("duration", minDuration)
    .lte("duration", maxDuration)
    .order("duration", { ascending: true });

  if (error) {
    console.error("Error fetching videos by duration:", error);
    return [];
  }

  return data || [];
}
