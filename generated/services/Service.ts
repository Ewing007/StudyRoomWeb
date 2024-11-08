/* generated1 using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnnouncementCreateReqDto } from "../models/AnnouncementCreateReqDto";
import type { AnnouncementUpdateReqDto } from "../models/AnnouncementUpdateReqDto";
import type { BookRoomReqDto } from "../models/BookRoomReqDto";
import type { LostFoundAdminReqDto } from "../models/LostFoundAdminReqDto";
import type { LostFoundPersonaReqDto } from "../models/LostFoundPersonaReqDto";
import type { LostFoundReqDto } from "../models/LostFoundReqDto";
import type { MessageReplyReqDto } from "../models/MessageReplyReqDto";
import type { MessageReqDto } from "../models/MessageReqDto";
import type { ResultPage } from "../models/ResultPage";
import type { RoomCreateReqDto } from "../models/RoomCreateReqDto";
import type { RoomUpdateReqDto } from "../models/RoomUpdateReqDto";
import type { UserDeleteReqDto } from "../models/UserDeleteReqDto";
import type { UserDisableReqDto } from "../models/UserDisableReqDto";
import type { UserLoginReqDto } from "../models/UserLoginReqDto";
import type { UserRegisterReqDto } from "../models/UserRegisterReqDto";
import type { UserTable } from "../models/UserTable";
import type { UserUpdateReqDto } from "../models/UserUpdateReqDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../../generated/core/request";
import { LogReqDto } from "../../generated";
import { AnnouncementReqDto } from "../../generated/";
import { LostFoundAllByAdminReqDto } from "../../generated/";
import { UserInfoAllByAdminReqDto } from "../../generated/";
import {
  PermissionsCreateByAdminReqDto,
  RolesCreateByAdminReqDto,
  RolesPermissionsAllByAdminReqDto
} from "../../generated";
import { UpdateRolesByAdminReqDto } from "../../generated";
import { UserUpdateByAdminReqDto } from "../../generated";
import { SeatViewReqDto } from "../../generated";
import { RoomQueryByConditionReqDto } from "../../generated";
import { GetAllRoomByAdminReqDto } from "../../generated";
import {
  GetAllReservationByAdminReqDto, MessageAllByUserReqDto, MessageByAdminReqDto,
  ReservationByUserReqDto,
  ReservationUpdateByAdminReqDto
} from "../../generated";

export class Service {
  // /**
  //  * 管理员更新自习室
  //  * @param roomId
  //  * @param requestBody
  //  * @returns ResultPage<any> OK
  //  * @throws ApiError
  //  */
  // public static someMethodToUpdateStudyRoom(
  //   roomId: string,
  //   requestBody: RoomUpdateReqDto
  // ): CancelablePromise<ResultPage<any>> {
  //   return __request(OpenAPI, {
  //     method: "PUT",
  //     url: "/StudyRoom-User/api/front/user/update_room/{roomId}",
  //     path: {
  //       "roomId": roomId
  //     },
  //     body: requestBody,
  //     mediaType: "application/json"
  //   });
  // }


  /**
   * 根据自习室ID座位ID编辑座位信息
   * @param roomId
   * @param seatId
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static someMethodToEditSeat(
    roomId: string,
    seatId: string,
    requestBody: Record<string, any>
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/StudyRoom-User/api/front/admin/edit_seat/{roomId}/{seatId}",
      path: {
        "roomId": roomId,
        "seatId": seatId
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 根据自习室ID座位ID用户ID编辑用户预约信息
   * @param roomId
   * @param seatId
   * @param userId
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static someMethodToEditStudyRoom(
    roomId: string,
    seatId: string,
    userId: string,
    requestBody: Record<string, any>
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/StudyRoom-User/api/front/admin/edit_reservation/{roomId}/{seatId}/{userId}",
      path: {
        "roomId": roomId,
        "seatId": seatId,
        "userId": userId
      },
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 更新用户信息
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static update(
    requestBody: UserUpdateReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/user/update",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 恢复删除用户
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static undelete(
    requestBody: UserDeleteReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/user/undelete",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 解封用户
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static unblock(
    requestBody: UserDisableReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/user/unblock",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 注册接口
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static register(
    requestBody: UserRegisterReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/user/register",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 退出登录
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static logout(): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/user/logout"
    });
  }

  /**
   * 登录接口
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static login(
    requestBody: UserLoginReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/user/login",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 禁用用户
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static disable(
    requestBody: UserDisableReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/user/disable",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 删除用户
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static delete(
    requestBody: UserDeleteReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/user/delete",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 管理员新建自习室
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static someMethodToCreateStudyRoom(
    requestBody: RoomCreateReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/admin/create_room",
      body: requestBody,
      mediaType: "application/json"
    });
  }


  /**
   * 用户预约自习室
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static someMethodToBookStudyRoom(
    requestBody: BookRoomReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/StudyRoom-User/api/front/user/book',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 回复留言接口
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static reply(
    requestBody: MessageReplyReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/message/reply",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 发表留言接口
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static post(
    requestBody: MessageReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/message/post",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 查看我的失物招领接口
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static viewPost(): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/found/view_persona"
    });
  }

  /**
   * 发布失物招领接口
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static post1(
    requestBody: LostFoundReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/found/post",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 管理个人失物招领接口
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static persona(
    requestBody: LostFoundPersonaReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/found/persona",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 管理员管理失物招领接口
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static managerByAdmin(
    requestBody: LostFoundAdminReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/found/manager",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 用户头像上传
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static uploadAvatar(
    requestBody?: FormData
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/file/upload/user_avatar",
      body: requestBody,
      // mediaType: "multipart/form-data"
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }

  /**
   * 自习室图像上传
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static uploadStudyRoomImage(
    // requestBody?: {
    //   file: Blob;
    // }
    requestBody: FormData
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/file/upload/studyroom_image",
      body: requestBody,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }

  /**
   * 失物招领图像上传
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static uploadLostAndFoundImage(
    // requestBody?: {
    //   file: Blob;
    // }
    requestBody: FormData
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/file/upload/lost_found_image",
      body: requestBody,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }

  /**
   * 更新公告
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static updateAnnouncement(
    requestBody: AnnouncementUpdateReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/announcement/update",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 创建公告
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static createAnnouncement(
    requestBody: AnnouncementCreateReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/announcement/create",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 管理员恢复删除用户
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static undelete1(
    requestBody: UserDeleteReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/admin/undelete",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 管理员解封用户
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static unblock1(
    requestBody: UserDisableReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/admin/unblock",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 管理员禁用用户
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static disable1(
    requestBody: UserDisableReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/admin/disable",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 管理员删除用户
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static delete1(
    requestBody: UserDeleteReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/admin/delete",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 管理员新建自习室
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static someMethodToCreateStudyRoom1(
    requestBody: RoomCreateReqDto
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/admin/create_room",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 用户分配权限
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static assignPermission(
    requestBody: UserTable
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/admin/assign_permission",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 新增权限
   * @param requestBody
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static addPermission(
    requestBody: string
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/StudyRoom-User/api/front/admin/add_permission",
      body: requestBody,
      mediaType: "application/json"
    });
  }

  /**
   * 根据roomId获取座位信息获取所有座位信息
   * @param roomId
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static someMethodToQuerySeats(
    roomId: string
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/StudyRoom-User/api/front/user/{roomId}/seats",
      path: {
        "roomId": roomId
      }
    });
  }

  /**
   * 接口测试
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static test(): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/StudyRoom-User/api/front/user/test"
    });
  }

  /**
   * 获取所有自习室信息
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static someMethodToGetAllStudyRooms(): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/StudyRoom-User/api/front/user/rooms"
    });
  }

  /**
   * 用户查询自习室
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static someMethodToQueryStudyRoom(): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/StudyRoom-User/api/front/user/query_reservation"
    });
  }

  /**
   * 获取某条留言的所有回复接口
   * @param id
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static getRepliesByMessageId(
    messageId: string
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/StudyRoom-User/api/front/message/replies/{messageId}",
      path: {
        "messageId": messageId
      }
    });
  }

  /**
   * 获取所有留言接口
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static getAllMessages(): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/StudyRoom-User/api/front/message/all"
    });
  }

  /**
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static recording(): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/StudyRoom-User/api/front/log/recording"
    });
  }

  /**
   * 图形验证码发送接口
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static getImgVerityCode(): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/StudyRoom-User/api/front/image/img_verity_code"
    });
  }

  /**
   * 获取某条失物招领接口
   * @param id
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static getAllByLostId(
    id: number
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/StudyRoom-User/api/front/found/{id}/lost_found",
      path: {
        "id": id
      }
    });
  }

  /**
   * 查看所有失物招领接口
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static all(): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/StudyRoom-User/api/front/found/all"
    });
  }

  /**
   * 获取所有公告
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static getAllAnnouncement(): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/StudyRoom-User/api/front/announcement/all"
    });
  }

  /**
   * 根据自习室ID获取所有预约信息
   * @param roomId
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static someMethodToQueryStudyRoom1(
    roomId: string
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/StudyRoom-User/api/front/admin/query_reservation/{roomId}",
      path: {
        "roomId": roomId
      }
    });
  }

  /**
   * 获取所有用户信息
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static getAllUsers(): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/StudyRoom-User/api/front/admin/all_users"
    });
  }

  /**
   * 获取所有权限信息
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static getAllPermissions(): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/StudyRoom-User/api/front/admin/all_permissions"
    });
  }

  /**
   * 管理员删除自习室
   * @param roomId
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static someMethodToDeleteStudyRoom(
    roomId: string
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/StudyRoom-User/api/front/admin/delete_room/{roomId}",
      path: {
        "roomId": roomId
      }
    });
  }

  /**
   * 删除权限
   * @param permission
   * @returns ResultPage<any> OK
   * @throws ApiError
   */
  public static deletePermission(
    permission: string
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/StudyRoom-User/api/front/admin/delete_permission/{permission}",
      path: {
        "permission": permission
      }
    });
  }

  /**
   * 管理员获取所有日志信息
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static getAllLogs(
    requestBody: LogReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/StudyRoom-User/api/front/admin/all_logs',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 管理员获取所有公告信息
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static getAllAnnouncements(
    requestBody: AnnouncementReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/StudyRoom-User/api/front/admin/all_announcements',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 管理员管理失物招领信息
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static managerByAdmin1(
    requestBody: LostFoundAdminReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/StudyRoom-User/api/front/admin/manager_lost_found',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 管理员获取所有失物招领信息
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static getAllLoststByAdmin(
    requestBody: LostFoundAllByAdminReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/StudyRoom-User/api/front/admin/all_lost_founds',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 管理员管理所有用户
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static managerAllUsers(
    requestBody: UserInfoAllByAdminReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/StudyRoom-User/api/front/admin/manager_all_users',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 管理员所有角色和权限信息
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static getAllRolePermissions(
    requestBody: RolesPermissionsAllByAdminReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/StudyRoom-User/api/front/admin/get_all_role_permissions',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 管理员新增角色
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static createRolesByAdmin(
    requestBody: RolesCreateByAdminReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/StudyRoom-User/api/front/admin/create_role',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 管理员新增权限
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static createPermissionByAdmin(
    requestBody: PermissionsCreateByAdminReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/StudyRoom-User/api/front/admin/create_permission',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 管理员获取所有角色
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static getAllRolesByAdmin(): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/StudyRoom-User/api/front/admin/all_roles',
    });
  }
  /**
   * 管理员获取所有权限
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static getAllPermissionsByAdmin(): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/StudyRoom-User/api/front/admin/all_permissions',
    });
  }

  /**
   * 管理员为角色增加或删除权限
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static updateRolePermissionsByAdmin(
    requestBody: UpdateRolesByAdminReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/StudyRoom-User/api/front/admin/update_role',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 管理员更新用户
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static updateUserByAdmin(
    requestBody: UserUpdateByAdminReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/StudyRoom-User/api/front/admin/update_user_by_admin',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 获取某个自习室所有可预约时间字段
   * @param roomId
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static getTimeSlotsByRoomId(
    roomId: string,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/StudyRoom-User/api/front/user/{roomId}/time_slots',
      path: {
        'roomId': roomId,
      },
    });
  }

  /**
   * 获取某个自习室所有可预约日期
   * @param roomId
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static getDateByRoomId(
    roomId: string,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/StudyRoom-User/api/front/user/{roomId}/date',
      path: {
        'roomId': roomId,
      },
    });
  }
  /**
   * 可预约日期时间段内的座位信息
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static methodToGetSeatInfoByDateAndTime(
    requestBody: SeatViewReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/StudyRoom-User/api/front/user/view_seats',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 根据帅选条件获取自习室信息
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static someMethodToQueryStudyRoomByCondition(
    requestBody: RoomQueryByConditionReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/StudyRoom-User/api/front/user/query_by_condition',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 管理员获取所有自习室
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static getAllRooms(
    requestBody: GetAllRoomByAdminReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/StudyRoom-User/api/front/admin/all_rooms',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 获取所有时间字段
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static someMethodToGetAllTime(): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/StudyRoom-User/api/front/user/get_all_time',
    });
  }
  /**
   * 管理员更新自习室
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static someMethodToUpdateStudyRoom(
    requestBody: RoomUpdateReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/StudyRoom-User/api/front/admin/update_room',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 管理员获取所有预约信息
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static someMethodToGetAllReservations(
    requestBody: GetAllReservationByAdminReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/StudyRoom-User/api/front/admin/all_reservations',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 管理员更新预约信息
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static someMethodToUpdateReservation(
    requestBody: ReservationUpdateByAdminReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/StudyRoom-User/api/front/admin/update_reservation',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 用户查询预约记录
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static someMethodToQueryReservation(
    requestBody: ReservationByUserReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/StudyRoom-User/api/front/user/query_reservation',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 用户取消预约自习室
   * @param reservationId
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static someMethodToCancelStudyRoom(
    reservationId: string,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/StudyRoom-User/api/front/user/cancel/{reservationId}',
      path: {
        'reservationId': reservationId,
      },
    });
  }

  /**
   * 某个用户的所有留言接口
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static getMessagesByUserId(
    requestBody: MessageAllByUserReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/StudyRoom-User/api/front/message/user/getMessagse',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 删除留言接口
   * @param messageId
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static deleteMessage(
    messageId: string,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/StudyRoom-User/api/front/message/delete/{messageId}',
      path: {
        'messageId': messageId,
      },
    });
  }

  /**
   * 管理员删除留言接口
   * @param messageId
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static deleteMessageByAdmin(
    messageId: string,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/StudyRoom-User/api/front/admin/delete_by_admin/{messageId}',
      path: {
        'messageId': messageId,
      },
    });
  }

  /**
   * 管理员获取所有留言接口
   * @param requestBody
   * @returns ResultPage OK
   * @throws ApiError
   */
  public static getAllMessagesByAdmin(
    requestBody: MessageByAdminReqDto,
  ): CancelablePromise<ResultPage<any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/StudyRoom-User/api/front/admin/admin/all',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}