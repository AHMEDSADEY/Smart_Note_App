import Note from '../DB/model/Note/Note.model.js';
import User from '../DB/model/User/user.model.js';

export const resolvers = {
  Query: {
    notes: async (_, { filters = {}, pagination = {} }) => {
      try {
        const { page = 1, limit = 10 } = pagination;
        const skip = (page - 1) * limit;

        // Build filter query
        const filterQuery = {};

        if (filters.userId) {
          filterQuery.ownerId = filters.userId;
        }

        if (filters.title) {
          filterQuery.title = { $regex: filters.title, $options: 'i' };
        }

        if (filters.createdAfter || filters.createdBefore) {
          filterQuery.createdAt = {};
          if (filters.createdAfter) {
            filterQuery.createdAt.$gte = new Date(filters.createdAfter);
          }
          if (filters.createdBefore) {
            filterQuery.createdAt.$lte = new Date(filters.createdBefore);
          }
        }

        if (filters.isDeleted !== undefined) {
          filterQuery.isDeleted = filters.isDeleted;
        }

        // Get total count for pagination
        const totalCount = await Note.countDocuments(filterQuery);
        const totalPages = Math.ceil(totalCount / limit);

        // Get paginated notes with owner information
        const notes = await Note.find(filterQuery)
          .populate('ownerId', 'userName email role profilePic createdAt updatedAt')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit);

        return {
          notes,
          totalCount,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          currentPage: page,
          totalPages
        };
      } catch (error) {
        throw new Error(`Failed to fetch notes: ${error.message}`);
      }
    }
  },

  Note: {
    ownerId: async (parent) => {
      // This resolver is called when the ownerId field is requested
      // Since we're already populating in the query, this should return the populated data
      return parent.ownerId;
    }
  }
}; 